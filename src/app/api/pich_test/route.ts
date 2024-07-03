import { NextRequest, NextResponse } from 'next/server';

let dataStore: any[] = [];

export async function GET(request: NextRequest) {
    try {
      // Respond with the current state of the data store
      return NextResponse.json({ message: 'Data retrieved successfully', data: dataStore });
    } catch (error: any) {
      console.error('Error handling GET request:', error);
      return NextResponse.json({ message: 'Failed to retrieve data', error: error.message }, { status: 500 });
    }
  }

export async function POST(request: NextRequest) {
    try {
      const body = await request.json();
      dataStore.push(body);
      return NextResponse.json({ message: 'Data added successfully', data: body });
    } catch (error: any) {
      console.error('Error handling POST request:', error);
      return NextResponse.json({ message: 'Failed to add data', error: error.message }, { status: 500 });
    }
  }