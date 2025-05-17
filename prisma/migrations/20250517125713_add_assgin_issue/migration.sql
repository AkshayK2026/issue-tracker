-- AlterTable
ALTER TABLE `issue` ADD COLUMN `assignedToUserid` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedToUserid_fkey` FOREIGN KEY (`assignedToUserid`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
