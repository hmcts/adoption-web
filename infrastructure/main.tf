provider "azurerm" {
 features {}
}

locals {
  vaultName = "${var.product}-${var.env}"
}

data "azurerm_subnet" "core_infra_redis_subnet" {
  name                 = "core-infra-subnet-1-${var.env}"
  virtual_network_name = "core-infra-vnet-${var.env}"
  resource_group_name = "core-infra-${var.env}"
}

module "adoption-web-session-storage" {
  source   = "git@github.com:hmcts/cnp-module-redis?ref=redis-version-param"
  product  = "${var.product}-${var.component}-session-storage"
  location = var.location
  env      = var.env
  subnetid = data.azurerm_subnet.core_infra_redis_subnet.id
  common_tags  = var.common_tags
  redis_version = 6
}

data "azurerm_key_vault" "adoption_key_vault" {
  name = local.vaultName
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
  name = "idam-secret"
  key_vault_id = "${data.azurerm_key_vault.adoption_key_vault.id}"
}

data "azurerm_key_vault_secret" "idam-system-user-name" {
  name = "idam-system-user-name"
  key_vault_id = "${data.azurerm_key_vault.adoption_key_vault.id}"
}

data "azurerm_key_vault_secret" "idam-system-user-password" {
  name = "idam-system-user-password"
  key_vault_id = "${data.azurerm_key_vault.adoption_key_vault.id}"
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
