import { PrismaClient } from "@prisma/client";

declare global {
  var cachePrisma: PrismaClient;
}

let prisma: PrismaClient;

if(process.env.NODE_ENV === "production"){
  prisma = new PrismaClient();
}else{
  if(!global.cachePrisma){
    global.cachePrisma = new PrismaClient();
  }
  prisma = global.cachePrisma;
}

export const db = prisma


// Esse bloco de código impede que o next faça conexões com o banco a cada reload
// Ele previne criar varias conexões desnecessárias