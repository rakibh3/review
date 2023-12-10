import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler'
import { notFoundRoute } from './app/middlewares/notFoundRoute'

// Create Express app
const app: Application = express()

// Parser
app.use(express.json())
app.use(cors())

// Create handler for GET request /
const getRootController = (req: Request, res: Response) => {
  // Send response text
  res.send('Hello Express JS!')
}

// Route handler for /
app.get('/', getRootController)

// Error Handler
app.use(globalErrorHandler)

// Not found route
app.use(notFoundRoute)

export default app
