variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "owner" {
  description = "Team or person owning these resources"
  type        = string
  default     = "srikanth-gude"
}

variable "image_tag" {
  description = "Docker image tag to deploy"
  type        = string
}

variable "alarm_email" {
  description = "Email for CloudWatch alarm notifications"
  type        = string
  default     = ""
}
