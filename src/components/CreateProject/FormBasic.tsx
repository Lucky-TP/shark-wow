
type Props = {}

export default function FormBasic({}: Props) {
    return (
        <>
            <form>
                <h1>Basic Details</h1>
                <p>summarize your details for good impression</p>
                <h3>Project title</h3>
                <h5>what is the title for your project?</h5>
                <input name="title" type="text"/>
                <h3>Project description</h3>
                <h5>A short description that describes about your project</h5>
                <input name="description" type="text"/>
                <h3>Project Image</h3>
                <h5>Upload a picture of your project</h5>
                <input name="image" type="file"/>
                <h3>Location</h3>
                <input name="location" type="text"/>
                <h3>Category</h3>
                <select name="category" id="category">
                    <option value="technology">Technology</option>
                    <option value="food">Food</option>
                    <option value="art">Art</option>
                    <option value="health">Health</option>
                </select>
                <h3>Starting Date</h3>
                <input name="startingDate" type="date"/>
                <h3>Project Duration</h3>
                <input name="duration" type="number"/>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}