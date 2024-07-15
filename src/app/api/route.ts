import { NextRequest, NextResponse } from 'next/server';

// Mock data to simulate a database
let dataStore: any[] = [];

// GET method handler
export async function GET(request: NextRequest) {
  try {
    // Respond with the current state of the data store
    return NextResponse.json({ message: 'Data retrieved successfully', data: dataStore });
  } catch (error: any) {
    console.error('Error handling GET request:', error);
    return NextResponse.json({ message: 'Failed to retrieve data', error: error.message }, { status: 500 });
  }
}

// POST method handler
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

// PUT method handler
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const index = dataStore.findIndex(item => item.id === body.id);

    if (index !== -1) {
      dataStore[index] = body;
      return NextResponse.json({ message: 'Data updated successfully', data: body });
    } else {
      return NextResponse.json({ message: 'Data not found', error: 'Data not found' }, { status: 404 });
    }
  } catch (error: any) {
    console.error('Error handling PUT request:', error);
    return NextResponse.json({ message: 'Failed to update data', error: error.message }, { status: 500 });
  }
}

// DELETE method handler
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const index = dataStore.findIndex(item => item.id === id);

    if (index !== -1) {
      const deletedItem = dataStore.splice(index, 1);
      return NextResponse.json({ message: 'Data deleted successfully', data: deletedItem });
    } else {
      return NextResponse.json({ message: 'Data not found', error: 'Data not found' }, { status: 404 });
    }
  } catch (error: any) {
    console.error('Error handling DELETE request:', error);
    return NextResponse.json({ message: 'Failed to delete data', error: error.message }, { status: 500 });
  }
}
