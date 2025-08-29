// Infrastructural variables
variable "product" {}
variable "component" {}

variable "raw_product" {
  default = "adoption"
}

variable "microservice" {
  default = "adoption-web"
}

variable "location" {
  default = "UK South"
}

variable "env" {}



variable "subscription" {}

variable "jenkins_AAD_objectId" {
  description = "(Required) The Azure AD object ID of a user, service principal or security group in the Azure Active Directory tenant for the vault. The object ID must be unique for the list of access policies."
}

variable "tenant_id" {
  description = "(Required) The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault. This is usually sourced from environemnt variables and not normally required to be specified."
}

variable "node_env" {
  default = "production"
}

variable "appinsights_instrumentation_key" {
  description = "Instrumentation key of the App Insights instance this webapp should use. Module will create own App Insights resource if this is not provided"
  default     = ""
}

variable "common_tags" {
  type = map(string)
}
variable "family" {
  default     = "C"
  description = "The SKU family/pricing group to use. Valid values are `C` (for Basic/Standard SKU family) and `P` (for Premium). Use P for higher availability, but beware it costs a lot more."
}

variable "sku_name" {
  default     = "Basic"
  description = "The SKU of Redis to use. Possible values are `Basic`, `Standard` and `Premium`."
}

variable "capacity" {
  default     = "1"
  description = "The size of the Redis cache to deploy. Valid values are 1, 2, 3, 4, 5"
}

variable "rdb_backup_enabled" {
  type    = bool
  default = false
}

variable "rdb_backup_max_snapshot_count" {
  type        = string
  default     = "1"
  description = "The maximum number of snapshots to create as a backup. Only supported for Premium SKUs."
}

variable "redis_backup_frequency" {
  default     = "360"
  description = "The Backup Frequency in Minutes. Only supported on Premium SKUs. Possible values are: 15, 30, 60, 360, 720 and 1440"
}
