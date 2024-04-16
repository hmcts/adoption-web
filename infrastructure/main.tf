provider "azurerm" {
  features {}
}

locals {
  vaultName = "${var.product}-${var.env}"
}

data "azurerm_subnet" "core_infra_redis_subnet" {
  name                 = "core-infra-subnet-1-${var.env}"
  virtual_network_name = "core-infra-vnet-${var.env}"
  resource_group_name  = "core-infra-${var.env}"
}

module "adoption-web-session-storage" {
  source                          = "git@github.com:hmcts/cnp-module-redis?ref=DTSPO-17012-data-persistency"
  product                         = "${var.product}-${var.component}-session-storage"
  location                        = var.location
  env                             = var.env
  private_endpoint_enabled        = true
  redis_version                   = "6"
  business_area                   = "cft"
  public_network_access_enabled   = false
  common_tags                     = var.common_tags
  sku_name                        = var.sku_name
  family                          = var.family
  capacity                        = var.capacity
  rdb_backup_enabled              = var.rdb_backup_enabled
  rdb_backup_frequency            = var.redis_backup_frequency
  rdb_storage_account_name_prefix = var.raw_product
}

data "azurerm_key_vault" "adoption_key_vault" {
  name                = local.vaultName
  resource_group_name = "${var.raw_product}-${var.env}"
}

data "azurerm_key_vault" "s2s_vault" {
  name                = "s2s-${var.env}"
  resource_group_name = "rpe-service-auth-provider-${var.env}"
}

data "azurerm_key_vault_secret" "microservicekey_adoption_web" {
  name         = "microservicekey-adoption-web"
  key_vault_id = data.azurerm_key_vault.s2s_vault.id
}

resource "azurerm_key_vault_secret" "s2s-secret" {
  name         = "s2s-secret"
  value        = data.azurerm_key_vault_secret.microservicekey_adoption_web.value
  key_vault_id = data.azurerm_key_vault.adoption_key_vault.id
}

data "azurerm_key_vault_secret" "idam-secret" {
  name         = "idam-secret"
  key_vault_id = data.azurerm_key_vault.adoption_key_vault.id
}

data "azurerm_key_vault_secret" "idam-system-user-name" {
  name         = "idam-system-user-name"
  key_vault_id = data.azurerm_key_vault.adoption_key_vault.id
}

data "azurerm_key_vault_secret" "idam-system-user-password" {
  name         = "idam-system-user-password"
  key_vault_id = data.azurerm_key_vault.adoption_key_vault.id
}

resource "azurerm_key_vault_secret" "redis_access_key" {
  name         = "redis-access-key"
  value        = module.adoption-web-session-storage.access_key
  key_vault_id = data.azurerm_key_vault.adoption_key_vault.id
}

# data "azurerm_key_vault_secret" "app_insights_instrumental_key" {
#   name = "AppInsightsInstrumentationKey"
#   key_vault_id = "${data.azurerm_key_vault.adoption_key_vault.id}"
# }
