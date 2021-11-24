provider "azurerm" {
 features {}
}

data "azurerm_key_vault" "adoption_key_vault" {
  name = "${var.raw_product}-kv-${var.env}"
  resource_group_name = "${var.raw_product}-${var.env}"
}

data "azurerm_key_vault_secret" "oauth_client_secret" {
  name = "citizen-oauth-client-secret"
  key_vault_id = "${data.azurerm_key_vault.adoption_key_vault.id}"
}

data "azurerm_key_vault" "s2s_vault" {
  name                = "s2s-${var.env}"
  resource_group_name = "rpe-service-auth-provider-${var.env}"
}

data "azurerm_key_vault_secret" "microservicekey_adoption_web" {
  name         = "microservicekey-adoption-web" # update key name e.g. microservicekey-your-name
  key_vault_id = data.azurerm_key_vault.s2s_vault.id
}

resource "azurerm_key_vault_secret" "s2s-secret" {
  name         = "s2s-secret"
  value        = data.azurerm_key_vault_secret.microservicekey_adoption_web.value
  key_vault_id = data.azurerm_key_vault.adoption_key_vault.id
}

# data "azurerm_key_vault_secret" "app_insights_instrumental_key" {
#   name = "AppInsightsInstrumentationKey"
#   key_vault_id = "${data.azurerm_key_vault.adoption_key_vault.id}"
# }
