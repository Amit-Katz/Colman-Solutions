resource "aws_lb" "alb" {
  name               = "alb"
  internal           = false
  security_groups    = [ aws_security_group.http-lb.id, aws_security_group.internal.id ]
  load_balancer_type = "application"
  subnets = module.vpc.public_subnets
}

resource "aws_lb_target_group" "frontend" {
  name        = "frontend"
  target_type = "instance"
  port        = "3000"
  protocol    = "HTTP"
  vpc_id      = module.vpc.vpc_id

  health_check {
    path     = "/"
    port     = "3000"
    protocol = "HTTP"
    matcher  = "200"
    interval = 15
    healthy_threshold = 2
    timeout = 6
  }
}

resource "aws_lb_target_group" "backend" {
  name        = "backend"
  target_type = "instance"
  port        = "3010"
  protocol    = "HTTP"
  vpc_id      = module.vpc.vpc_id

  health_check {
    path     = "/api/isAlive"
    port     = "3010"
    protocol = "HTTP"
    matcher  = "200"
    interval = 15
    healthy_threshold = 2
    timeout = 6
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend.arn
  }
}

resource "aws_lb_listener_rule" "backend" {
  listener_arn = aws_lb_listener.http.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend.arn
  }

  condition {
    path_pattern {
      values = ["/api/*"]
    }
  }
}