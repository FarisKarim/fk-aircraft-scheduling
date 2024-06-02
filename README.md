# Aircraft Scheduling App

A application to manage aircraft scheduling for a list of flights

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Assumptions](#assumptions)
- [Demo](#demo)

## Technologies Used

- React
- Next.js
- Tailwind CSS

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/FarisKarim/fk-aircraft-scheduling.git
    cd aircraft-scheduling-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Select an Aircraft**: First, select on an aircraft from the list.
2. **Add Flights**: Click on a flight from the list to add it to the selected aircraft's rotation.
3. **View and Edit Rotation**: The rotation for the selected aircraft is displayed. You can add more flights or clear the rotation using the "Clear All" button.
4. **Navigate Dates**: Use the date picker at the top to navigate between different days. The rotations will reset when the date changes.

## Assumptions

- The application is designed for desktop devices only and so it is not responsive across devices.
- The scheduling is limited to one day's worth of flights. If a different day is selected, all rotations for all aircrafts will reset.
- Multiple aircraft can be assigned the same flight, allowing them to go to the same location during the same time if scheduling permits.
- No functionality to check if planes are grounded at midnight is needed as there are no flights that are in the air during midnight.
## Demo
https://fk-aircraft-scheduling.vercel.app/