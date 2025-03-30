import mysql from 'mysql2/promise';
import { exit } from 'process';

// TODO: adjust these connection details to match your SingleStore deployment:
const HOST = 'svc-3482219c-a389-4079-b18b-d50662524e8a-shared-dml.aws-virginia-6.svc.singlestore.com:3333';
const USER = 'sys';
const PASSWORD = 'gN97msvLWphcHeoiWLKNrHZzK7t9OSVV';
const DATABASE = 'db_henrique_ab0f4';

//const pool = mysql.createPool("singlestore://sys:VRdAvtu1DfjYnEd76qJBwGNYFPH4mn5a@svc-3482219c-a389-4079-b18b-d50662524e8a-shared-dml.aws-virginia-6.svc.singlestore.com:3333/db_henrique_ab0f4?ssl={}");

async function queryDatabase(query, params = []) {
    try {
        const [rows] = await pool.execute(query, params);
        return rows;
    } catch (err) {
        console.error('Database query error:', err);
        throw err;
    }
}

// main is run at the end
async function main() {
    let singleStoreConnection;
    try {
        const pool = mysql.createPool("singlestore://sys:gN97msvLWphcHeoiWLKNrHZzK7t9OSVV@svc-3482219c-a389-4079-b18b-d50662524e8a-shared-dml.aws-virginia-6.svc.singlestore.com:3333/db_henrique_ab0f4?ssl={}");
        const i = await pool.query('select 1')
        console.log(i);
    } catch (err) {// Good programmers always handle their errors :)
        console.error('ERROR', err);
        process.exit(1);
    } finally { if (singleStoreConnection) { await singleStoreConnection.end(); } }
};

async function getAllUsers() {
    let singleStoreConnection;
    try {
        const pool = mysql.createPool("singlestore://sys:gN97msvLWphcHeoiWLKNrHZzK7t9OSVV@svc-3482219c-a389-4079-b18b-d50662524e8a-shared-dml.aws-virginia-6.svc.singlestore.com:3333/db_henrique_ab0f4?ssl={}");
        const i = await pool.query('select * from users;')
        console.log(i);
    } catch (err) {
        console.error('ERROR', err);
        process.exit(1);
    } finally { if (singleStoreConnection) { await singleStoreConnection.end(); } }
};

const pool = mysql.createPool({
    host: 'svc-3482219c-a389-4079-b18b-d50662524e8a-shared-dml.aws-virginia-6.svc.singlestore.com',
    port: 3333,
    user: 'sys',
    password: 'gN97msvLWphcHeoiWLKNrHZzK7t9OSVV',
    database: 'db_henrique_ab0f4',
    ssl: {}, // Enable SSL if required
});

export async function getAllQuestions() {
    try {
        // Query the database for all questions
        const [rows] = await pool.query('SELECT * FROM question_bank;');
        console.log('Fetched questions:', rows);
        return rows;
    } catch (err) {
        console.error('Error fetching questions:', err);
        throw new Error('Failed to fetch questions'); // Throw an error to be handled by the caller
    }
}

export async function deleteCourse(subject_course){
    let pool;
    try {
        // Create a connection pool
        pool = mysql.createPool({
            host: HOST.split(':')[0],
            port: HOST.split(':')[1],
            user: USER,
            password: PASSWORD,
            database: DATABASE,
            ssl: {}, // Enable SSL if required
        });

        /*
        DELETE FROM question_bank WHERE category = 'testetsete';
        */

        // Use parameterized query to safely insert data into the database
        const query = `
            delete from question_bank where subject_course=?;
        `;
        const values = [subject_course];

        // Execute the query
        const [result] = await pool.query(query, values);

        console.log('Question added successfully:', result);

        return { success: true };
    } catch (err) {
        console.error('ERROR', err);
        return { success: false, message: 'An error occurred during login' };
    } finally {
        if (pool) {
            await pool.end(); // Close the connection pool
        }
    }
}

export async function create( category, question_text, subject_course) {

    let pool;
    try {
        // Create a connection pool
        pool = mysql.createPool({
            host: HOST.split(':')[0],
            port: HOST.split(':')[1],
            user: USER,
            password: PASSWORD,
            database: DATABASE,
            ssl: {}, // Enable SSL if required
        });

        // Use parameterized query to safely insert data into the database
        const query = `
            INSERT INTO question_bank (category, question_text, subject_course)
            VALUES (?,?,?);
        `;
        const values = [category, question_text, subject_course];

        // Execute the query
        const [result] = await pool.query(query, values);

        console.log('Question added successfully:', result);

        return { success: true};
    } catch (err) {
        console.error('ERROR', err);
        return { success: false, message: 'An error occurred during login' };
    } finally {
        if (pool) {
            await pool.end(); // Close the connection pool
        }
    }
}

export async function addQuestion(content) {
    try {
        /*

insert into question_bank (category, question_text, subject_course)
values ('Algebra', 'Whats is the value of a? a + 34 = 4', 'Math');
        */
        // Use parameterized query to safely insert data into the database
        const query = `
            INSERT INTO question_bank (category, question_text, subject_course)
            VALUES (content);
        `;
        const values = [category, question_text, subject_course];

        // Execute the query
        const [result] = await pool.query(query, values);

        console.log('Question added successfully:', result);

        return {
            category,
            question_text,
            subject_course,
        };
    } catch (err) {
        console.error('Error adding question:', err);
        throw new Error('Failed to add question'); // Throw an error to be handled by the caller
    }
}

// Function to validate login credentials
export async function validateLogin(username, password) {
    let pool;
    try {
        // Create a connection pool
        pool = mysql.createPool({
            host: HOST.split(':')[0],
            port: HOST.split(':')[1],
            user: USER,
            password: PASSWORD,
            database: DATABASE,
            ssl: {}, // Enable SSL if required
        });

        // Query the database for the user with the provided email
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            console.log('User not found');
            return { success: false, message: 'Invalid username or password' };
        }

        const user = rows[0];

        // completamente malefico nao usar encriptacao
        const isPasswordValid = password === user.password;

        if (!isPasswordValid) {
            console.log('Invalid password');
            return { success: false, message: 'Invalid username or password' };
        }

        console.log('Login successful');
        return { success: true, user };
    } catch (err) {
        console.error('ERROR', err);
        return { success: false, message: 'An error occurred during login' };
    } finally {
        if (pool) {
            await pool.end(); // Close the connection pool
        }
    }
}


// { category, question_text, subject_course }
//create("Leitura", "Descreva, de forma sucinta, a obra mais conhecida de Camilo Castelo Branco, Amor de Perdição", "Português");
//deleteQuestion("Teste","Teste","Teste");

//deleteCourse("teste");