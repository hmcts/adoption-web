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

# data "azurerm_key_vault_secret" "app_insights_instrumental_key" {
#   name = "AppInsightsInstrumentationKey"
#   key_vault_id = "${data.azurerm_key_vault.adoption_key_vault.id}"
# }
