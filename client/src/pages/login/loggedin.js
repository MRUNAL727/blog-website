import React, {useState,useEffect,useReducer,useContext,useRef,} from "react";
  
//-------------------Reducer------------------  
  const emailReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
      return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (action.type === "INPUT_BLUR") {
      return { value: state.value, isValid: state.value.trim().length > 6 };
    }
  
    return { value: "", isValid: false };
  };
  
  const Login = (props) => {
   
    const [formIsValid, setFormIsValid] = useState(false);
    const [emailState, dispatchEmail] = useReducer(emailReducer, {
      value: "",
      isValid: null,
    });
  
    const authContext = useContext(AuthContext);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
  
    useEffect(() => {
      const identifier = setTimeout(() => {
        setFormIsValid(
          emailState.isValid 
        );
      }, 500);
  
      clearTimeout();
  
      return () => {
        console.log("Clean");
        clearTimeout(identifier);
      };
    }, [emailState.isValid]);
  
    const emailChangeHandler = (event) => {
      dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  
      setFormIsValid(
        emailState.value.includes("@")
      );
    };
  
    const validateEmailHandler = () => {
      dispatchEmail({ type: "INPUT_BLUR" });
    };
  
  
    const submitHandler = (event) => {
      event.preventDefault();
      // props.onLogin(enteredEmail, enteredPassword);
      if (formIsValid) {
        authContext.onLogin(emailState.value);
      } else if (!emailState.isValid) {
        emailInputRef.current.focus();
      } else {
        passwordInputRef.current.focus();
      }
    };
  
    return (
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <Input
            ref={emailInputRef}
            type="email"
            id="email"
            label="E-Mail"
            isValid={emailState.isValid}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
          <Input
            ref={passwordInputRef}
            type="password"
            id="password"
            label="Password"
            isValid={passwordState.isValid}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
          <div className={classes.actions}>
            <Button type="submit" className={classes.btn} disabled={!formIsValid}>
              Login
            </Button>
          </div>
        </form>
      </Card>
    );
  };
  
  export default Login;