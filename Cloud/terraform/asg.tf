resource "aws_launch_template" "server-lt" {
  name = "server-lt"
  image_id = local.ami
  key_name = local.key_name
  instance_type   = "t2.micro"
  vpc_security_group_ids = [ aws_security_group.ssh.id, aws_security_group.internal.id ]
  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "web-servers"
    }
  }
  user_data = filebase64("${path.module}/app-start.sh")
}

resource "aws_autoscaling_group" "asg" {
  name     = "asg"
  launch_template {
    id = aws_launch_template.server-lt.id
    version = aws_launch_template.server-lt.latest_version
  }
  vpc_zone_identifier = module.vpc.public_subnets
  min_size             = 0
  max_size             = 2
  desired_capacity     = 2
  health_check_type    = "ELB"

  tag {
    key                 = "Name"
    value               = "myASG"
    propagate_at_launch = true
  }
}

resource "aws_autoscaling_attachment" "asg_alb_attachment_frontend" {
  autoscaling_group_name = resource.aws_autoscaling_group.asg.name
  lb_target_group_arn    = aws_lb_target_group.frontend.arn
}

resource "aws_autoscaling_attachment" "asg_alb_attachment_backend" {
  autoscaling_group_name = resource.aws_autoscaling_group.asg.name
  lb_target_group_arn    = aws_lb_target_group.backend.arn
}