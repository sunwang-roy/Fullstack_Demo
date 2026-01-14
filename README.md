# Fullstack_Demo
This project has achieved the required full-stack functionality, including login, creating appointments (with idempotency), and viewing my appointments.

## Technology stack
  - **Backend**: Java 21, Spring Boot 3.2.0, Gradle, JPA, H2 Database
  - **Frontend**: Taro v3.x, TypeScript, WeChat Mini Program

## key job
  - Global error handle
  - idempotency

## How to run
### Backend
1. Java JDK 21 and Gradle should be installed.
2. Enter the `backend` directory.
3. Execute `./gradlew bootRun` (Linux/Mac) or `gradlew.bat bootRun` (Windows).
4. The backend service will be launched on `http://localhost:8080`.
### Front-end
1. Ensure that Node.js is installed.
2. Globally install Taro CLI: `npm install -g @tarojs/cli`.
3. Enter the `frontend` directory.
4. Install dependencies: `npm install`.
5. Compile the project: `npm run dev:weapp`.
6. Open WeChat developer tool and import the `frontend/dist` directory.

## How to verify
1. **Login**: Navigate to the login page within the mini-program, and enter any phone number along with the fixed verification code `123456` to proceed with the login.
2. **Create an appointment**: After logging in, navigate to the creation page, fill in the service name, select the date and time, and click submit.
3. **Idempotency verification**: - Submit an appointment again using exactly the same information (phone number, date, time period).
    - Check the backend console output, which should display "Duplicate appointment found...".
    - Check the database or refresh the "My Appointments" page, and there should be only one record.
4. **View Reservations**: Click on the "My Reservations" tab at the bottom to see a list of all the current user's reservations.
