locals {
  vpc_cidr_block = "10.10.0.0/16"
  public_subnets = ["10.10.0.0/20", "10.10.16.0/20", "10.10.32.0/20"]
  ami            = "ami-82774254d610fcv9v"
  key_name       = "rsa-24"
  common_tags    = {
    owner = "Root"
  }
}