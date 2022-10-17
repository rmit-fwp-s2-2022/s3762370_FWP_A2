import { PostImage,Text, TextTitle } from "../Layout/Layoutcss";

// return sidebar
const Sidebar =() => {

    return (
         <div class="side">
             <h3 className="text-lg font-bold">Arcu blbend</h3>
             <h5>Sit amet mattis vulputate</h5>
             <PostImage src="/images/image1.jpg" alt="Image" />
             <p>Non blandit massa enim nec dui nunc mattis enim. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla..</p>
             <h3 className="text-lg font-bold mt-3">Massa enim</h3>
             <p>Lorem ipsum dolor sit ame.</p>
             <PostImage src="/images/image2.jpg" alt="Image" />
             <PostImage src="/images/image3.jpg" alt="Image" />
             <PostImage src="/images/image4.jpg" alt="Image" />
         </div>
    );
}
export default Sidebar;