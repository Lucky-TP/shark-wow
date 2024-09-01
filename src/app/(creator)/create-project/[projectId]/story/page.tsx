// import CKeditor from 'src/components/CreateProject/CKeditor';
import Sidebar from 'src/components/CreateProject/Sidebar';

export default function Story({ params }: { params: { projectId: string } }) {
  return (
    <div className="flex flex-row gap-10 p-4">
        <Sidebar/>
        <div className='flex flex-col'>
            <h1>Story</h1>
            {/* <CKeditor /> */}
        </div>
    </div>
  )
}