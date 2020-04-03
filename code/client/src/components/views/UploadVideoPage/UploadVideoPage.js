import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import Dropzone from 'react-dropzone';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
const { Title } = Typography;
const { TextArea } = Input;

const Private = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
]

const Catogory = [
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
]



const UploadVideoPage = (props) => {

    const user = useSelector(state => state.user);
    const [title, settitle] = useState("")
    const [Description, setDescription] = useState("");
    const [Privacy, setPrivacy] = useState(0);
    const [Categories, setCategories] = useState("Film and Animation");
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [Thumbnail, setThumbnail] = useState("");

    const handleChangeTitle = (e) => {

        settitle(e.target.value)
    }

    const handleChangeDescription = (e) => {

        setDescription(e.target.value)
    }

    const handleChangeOne = (e) => {

        setPrivacy(e.target.value)
    }

    const handleChangeTwo = (e) => {

        setCategories(e.target.value)
    }
    const onDrop = async (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files)
        formData.append('file', files[0]);//index 0 as only  1 video
        const response = await axios.post('/api/video/uploadfiles', formData, config)
        if (response.data.success) {
            console.log(response);
            let variable = {
                filePath: response.data.filePath,
                fileName: response.data.fileName
            }
            setFilePath(response.data.fileName)
            //generate thumbnail with this filePath

            const respose = await axios.post('/api/video/thumbnail', variable, config)
            if (respose.data.success) {
                setDuration(respose.data.fileDuration)
                setThumbnail(respose.data.thumbsFilePath)
            }
            else {
                alert('Failed to make the thumbnails');
            }


        } else {
            alert('failed to save the video')
        }
    }


    const onSubmit = async (e) => {

        e.preventDefault();
        if (user.userData && !user.userData.isAuth) {
            return alert("please Log in First");
        }
        if (title === "" || Description === "" ||
            Categories === "" || FilePath === "" ||
            Duration === "" || Thumbnail === "") {
            return alert('Please first fill all the fields')
        }

        const variables = {
            writer: user.userData._id,
            title: title,
            description: Description,
            privacy: Privacy,
            filePath: FilePath,
            category: Categories,
            duration: Duration,
            thumbnail: Thumbnail,
        }
        const response3 = await axios.post('/api/video/uploadVideo', variables);
        if (response3.data.success) {
            alert("video uploaded successfully")
            props.history.push('/')
        }
        else {
            alert("failed to upload the video")
        }
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Upload Video</Title>
            </div>

            <Form onSumbit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />

                            </div>
                        )}
                    </Dropzone>

                    {Thumbnail !== "" &&
                        <div>
                            <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
                        </div>
                    }
                </div>

                <br /><br />
                <label>Title</label>
                <Input
                    onChange={handleChangeTitle}
                    value={title}
                    name="title"
                />
                <br /><br />
                <label>Description</label>
                <TextArea
                    onChange={handleChangeDescription}
                    value={Description}
                    name="Description"
                />
                <br /><br />

                <select onChange={handleChangeOne} name="Privacy">
                    {Private.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <select onChange={handleChangeTwo} name="Categories">
                    {Catogory.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
            </Button>

            </Form>
        </div>
    )
}

export default UploadVideoPage

//video2
//import antdesign and also install react-dropzone and import it
//copy the reacy dropzone code from its git-docs and paste it in
//now we can an state for the input tags and select tags ,inport useState and UseEffect
//for the privacy state set default =0 tis means public and 1 means false
//craete the handlechange e for title,description,....
//create an array of object private outside the main function defining the value 0as private and 1 as public
//do the same for the categroy with as values as 0
//video 2 ends

//video 3
// create the onDrop function
// in the middle while making it make the route
// on success creste a object to conatin the file name and filePath 
//now make a state to store the filePath
//now we have to generatethe thumbnails in next video
// video 3 neds


//video4
//call axios.post for thumbnail generation inside onDrop function
//create the success and error handlers for the route
//goto router and make the route
//after making the route we need a new state to store the nameof the thumbnail and duration of the thumbnail
// and now comment out the frontend of that part

//video5
//create the onSumbit event handler
//use the useSelector hook to get the user info
//withthe following syntax
//make the request to the backend and then goto server and make the route
//make the successs and error handler of the request
//now prevent the user from uploading the video of he is not logged in or any of the field is left empty