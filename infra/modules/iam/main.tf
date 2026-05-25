data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda" {
  name               = "${var.name_prefix}-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
  tags               = var.tags
}

# Basic Lambda execution (CloudWatch logs)
resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# CloudWatch metrics publishing
data "aws_iam_policy_document" "cloudwatch_metrics" {
  statement {
    sid    = "CloudWatchMetrics"
    effect = "Allow"
    actions = [
      "cloudwatch:PutMetricData"
    ]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "cloudwatch_metrics" {
  name   = "${var.name_prefix}-cloudwatch-policy"
  policy = data.aws_iam_policy_document.cloudwatch_metrics.json
  tags   = var.tags
}

resource "aws_iam_role_policy_attachment" "cloudwatch_metrics" {
  role       = aws_iam_role.lambda.name
  policy_arn = aws_iam_policy.cloudwatch_metrics.arn
}

# ECR read access for Lambda to pull its own image
data "aws_iam_policy_document" "ecr_access" {
  statement {
    sid    = "ECRAccess"
    effect = "Allow"
    actions = [
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability"
    ]
    resources = [var.ecr_repository_arn]
  }
  statement {
    sid       = "ECRToken"
    effect    = "Allow"
    actions   = ["ecr:GetAuthorizationToken"]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "ecr_access" {
  name   = "${var.name_prefix}-ecr-policy"
  policy = data.aws_iam_policy_document.ecr_access.json
  tags   = var.tags
}

resource "aws_iam_role_policy_attachment" "ecr_access" {
  role       = aws_iam_role.lambda.name
  policy_arn = aws_iam_policy.ecr_access.arn
}
