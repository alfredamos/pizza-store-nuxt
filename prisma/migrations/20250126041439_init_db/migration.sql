-- CreateTable
CREATE TABLE `cartItems` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,
    `pizzaId` VARCHAR(191) NULL,
    `orderId` VARCHAR(191) NULL,
    `image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NULL,
    `gender` ENUM('Female', 'Male') NOT NULL DEFAULT 'Male',
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('User', 'Staff', 'Admin') NOT NULL DEFAULT 'User',
    `address` TEXT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(191) NOT NULL,
    `paymentId` VARCHAR(255) NOT NULL,
    `orderDate` DATETIME(3) NOT NULL,
    `shippingDate` DATETIME(3) NULL,
    `deliveryDate` DATETIME(3) NULL,
    `totalQuantity` INTEGER NOT NULL,
    `isShipped` BOOLEAN NOT NULL DEFAULT false,
    `isPending` BOOLEAN NOT NULL DEFAULT true,
    `isDelivered` BOOLEAN NOT NULL DEFAULT false,
    `totalPrice` DOUBLE NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `status` ENUM('Delivered', 'Pending', 'Shipped') NOT NULL DEFAULT 'Pending',

    UNIQUE INDEX `orders_paymentId_key`(`paymentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pizzas` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `topping` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 10,
    `image` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cartItems` ADD CONSTRAINT `cartItems_pizzaId_fkey` FOREIGN KEY (`pizzaId`) REFERENCES `pizzas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cartItems` ADD CONSTRAINT `cartItems_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pizzas` ADD CONSTRAINT `pizzas_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
