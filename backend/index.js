import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// Add new data in form
app.post('/api/records', async (req, res) => {
    try {
        const { id, Name, age } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }
        const response = await fetch(`${process.env.SHEET_API}/search?id=${id}`);
        const existingRecords = await response.json();

        if (existingRecords.length > 0) {
            return res.status(400).json({ error: 'Record with this ID already exists' });
        }
        const createResponse = await fetch(`${process.env.SHEET_API}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, Name, age }),
        });
        const createdData = await createResponse.json();
        res.status(201).json(createdData);
    } catch (error) {
        console.error('Error creating record:', error);
        res.status(500).json({ error: 'Failed to create record' });
    }
});



// get all data
app.get('/api/records', async (req, res) => {
    try {
        const { id, Name, age } = req.query;
        let apiUrl = process.env.SHEET_API;
        
        const searchParams = [];
        if (id) searchParams.push(`id=${id}`);
        if (Name) searchParams.push(`Name=${Name}`);
        if (age) searchParams.push(`age=${age}`);
        
        if (searchParams.length > 0) {
            apiUrl += '/search?' + searchParams.join('&');
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Getting record by ID calling 
app.get('/api/records/:id', async (req, res) => {
    try {
        const response = await fetch(`${process.env.SHEET_API}/search?id=${req.params.id}`);
        const data = await response.json();
        if (data.length === 0) {
            return res.status(404).json({ error: 'Record not found' });
        }
        res.json(data[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch record' });
    }
});

// Update record of user
app.put('/api/records/:id', async (req, res) => {
    try {
        const { Name, age } = req.body;
        const response = await fetch(`${process.env.SHEET_API}/id/${req.params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Name, age }),
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update record' });
    }
});

// Delete record of user
app.delete('/api/records/:id', async (req, res) => {
    try {
        const response = await fetch(`${process.env.SHEET_API}/id/${req.params.id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete record' });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});