import express from 'express';
import dotenv from 'dotenv'
import connectDb from './config/connectDb.js';
import urlRoute from './routes/urlRoutes.js';
import cors from 'cors'
dotenv.config();
const app = express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}
));
app.use(express.json());



const port = process.env.PORT;
connectDb();
app.get('/',(req,res) => {
    res.send('Hello from server!')
})

app.use('/',urlRoute)
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})