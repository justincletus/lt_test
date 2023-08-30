create database IF NOT EXISTS `l_test`;
create user `l_user`@`localhost` IDENTIFIED by 'ZGVtb21hcGR=';

grant all PRIVILEGES on `l_test`.* to `l_user`@`localhost`;
ALTER USER 'l_user'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'ZGVtb21hcGR=';


flush privileges;

use `l_test`;

create table if NOT EXISTS `users`(
    `id` int not null auto_increment,
    `username` varchar(50) not null unique,
    `password` varchar(255) not null,
    primary key(`id`)
)engine=innodb auto_increment=1000 default charset=latin1;