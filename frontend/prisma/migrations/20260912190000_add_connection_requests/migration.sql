CREATE TYPE "ConnectionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED');

CREATE TABLE "ConnectionRequest" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "message" VARCHAR(500),
    "status" "ConnectionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respondedAt" TIMESTAMP(3),

    CONSTRAINT "ConnectionRequest_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ConnectionRequest_senderId_recipientId_key" ON "ConnectionRequest"("senderId", "recipientId");
CREATE INDEX "ConnectionRequest_recipientId_status_idx" ON "ConnectionRequest"("recipientId", "status");
CREATE INDEX "ConnectionRequest_senderId_status_idx" ON "ConnectionRequest"("senderId", "status");

ALTER TABLE "ConnectionRequest" ADD CONSTRAINT "ConnectionRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ConnectionRequest" ADD CONSTRAINT "ConnectionRequest_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
