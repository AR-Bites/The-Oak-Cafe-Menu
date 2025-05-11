import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Serve the Oak Cafe AR dining application with environment variables injected
  app.get('/', (req, res) => {
    const html = storage.serveHtmlWithReplacedVariables('./updated-oak-cafe.html', {
      'FIREBASE_API_KEY': process.env.FIREBASE_API_KEY || 'AIzaSyAUCymhsmIx4IOkHphEFpLEhfLnPk0iPhU'
    });
    res.send(html);
  });
  
  // Keep backward compatibility
  app.get('/ar-dining', (req, res) => {
    const html = storage.serveHtmlWithReplacedVariables('./updated-oak-cafe.html', {
      'FIREBASE_API_KEY': process.env.FIREBASE_API_KEY || 'AIzaSyAUCymhsmIx4IOkHphEFpLEhfLnPk0iPhU'
    });
    res.send(html);
  });

  // Serve static images and models with proper paths
  app.use('/models', express.static(path.resolve('./models')));
  app.use('/models', express.static(path.resolve('./public/models')));
  app.use(express.static(path.resolve('.')));

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
