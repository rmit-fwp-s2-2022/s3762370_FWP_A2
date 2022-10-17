import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextTitle } from "../Layout/Layoutcss";
import Main from "../Layout/main";
import React from "react";
import { findUser, updateUser } from "../data/repository";

const EditUser =(props)=> {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({ });
    const [showModal, setShowModal] = React.useState(false);

    const [fields, setFields] = useState({
        userEmail : '',
        password : '',
        fullName : ''
    });

    const handleChange = (e) => {
        e.preventDefault();
        setFields(fields => ({...fields, [e.target.name] : e.target.value }));
    }

    // Validation and submit (copy from week7.lecture)
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if(!handleValidation())
          return;
    
        // Using Axios with async.
        try {
          // Update the user if id exists, otherwise create a new user.
        //   const result = id ?
        //     await updateUser(fields):
        //     await axios.post("http://localhost:4000/api/users", fields);
    
        //   // Check result, purposely not checked here for simplicity.
        //   // Result is logged to console for demostration purposes.
        //   console.log(result);
    
          // Before navigating start updating the parent.
          props.refreshUsers();
    
          // Navigate to the all users page.
          navigate("/");
        } catch(e) {
          setErrors({ errorMessage: e.message });
        }
      };

    // validation
    const handleValidation = async () => {
        const trimmedFields = trimFields();
        const currentErrors = { };

        let key = "username";
        let field = trimmedFields[key];
        if(field.length === 0)
        currentErrors[key] = "Username is required.";
        else if(field.length > 32)
            currentErrors[key] = "Username length cannot be greater than 32.";
        // else if(await findUser(trimmedFields.username) !== null)
        //     currentErrors[key] = "Username is already registered.";

        key = "email";
        field = trimmedFields[key];
        if (field.length === 0)
          currentErrors[key] = "Username is required.";
            // check valid email or not
        else if (!/\S+@\S+\.\S+/.test(fields[key]))
            currentErrors[key] = 'Email is invalid';

        key = "password";
        field = trimmedFields[key];
        if(field.length === 0)
            currentErrors[key] = "Password is required.";
        else if(field.length < 8)
            currentErrors[key] = "Password must contain at least 8 characters.";

        setErrors(currentErrors);

        return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
    };
  
    const trimFields = () => {
      const trimmedFields = { };
      // a way to trim all properties of an object
      Object.keys(fields).map(key => trimmedFields[key] = fields[key].trim());
      setFields(trimmedFields);

      return trimmedFields;
    };

    function login() {
      console.log('No errors, submit callback called!');
    }

    return (
        <Main>
            <form onSubmit={handleSubmit} className={" text-center"}>
                <TextTitle>Edit user profile</TextTitle>
                {/* input user fullName */}
                <input className="border-b-2 border-slate-800 my-3" type="text" name="fullName" onChange = {handleChange} placeholder="New Name" required />
                <br />
                {/* input user email */}
                <input className="border-b-2 border-slate-800 my-3" type="text" name="userEmail" onChange = {handleChange} placeholder="New Email" required />
                {errors.email && (
                    <p className="help is-danger">{errors.email}</p>
                  )}
                <br />
                {/* input passWord */}
                <input className="border-b-2 border-slate-800 my-3" type="password" name="password" onChange= {handleChange} placeholder="New Password" required />
                <br />
                <a className="bg-purple-500 rounded-md shadow-md hover:shadow-none hover:bg-purple-800 text-white py-2 px-5 font-bold  cursor-pointer"  onClick={() => setShowModal(true)}>Submit</a>
                {/* from here POP UP */}
                {showModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none" >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*inside of card modal*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none">
                                
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                    Edit account
                                </h3>
                                </div>

                                <div className="relative p-6 flex-auto">
                                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                    confirm to edit your account
                                </p>
                                </div>

                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <a
                                    className="text-black font-bold uppercase px-6 py-2 text-sm outline-none mr-1 mb-1 cursor-pointer"
                                    onClick={() => setShowModal(false)}
                                >
                                    CANCEL
                                </a>
                                <button
                                    className="text-black font-bold uppercase text-sm px-6 py-2 outline-none mr-1 mb-1"
                                    type="submit"
                                    to={"/"}
                                    onClick={() => handleSubmit()}
                                >
                                    CONFIRM
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
                {/* pop up end */}
            </form>
        </Main>
    );
}

export default EditUser