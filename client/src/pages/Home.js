import './home.css'
import DropFileInput from '../components/drop-file-input/DropFileInput'
  
const Home = (props) => {

    const onFileChange = (files) => {
        console.log(files)
    }

    return (
        <>
          <h1>Home testing</h1>    
          <h2 className='header'>
            react drag and drop files input

          </h2>
          <DropFileInput
              onFileChange={(files) => onFileChange(files)}
          />
        </>
    )
}

export default Home
