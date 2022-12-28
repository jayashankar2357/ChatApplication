import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import "../app/styles/PageLayout.css";
import hexImg from '../assets/HexagonImg.png'
import chatImg from '../assets/Chat.png'
/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props) => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            <header>
                <p>
                    <span className="imgHex"><img src={hexImg} alt="Hexagon" ></img></span>
                    <span className="signINOUT">{isAuthenticated ? <SignOutButton /> : <SignInButton />}</span>
                </p>
            </header>
            <div className="main" style ={ { backgroundImage: "url("+chatImg+")" } }>
                {/* <Navbar bg="primary" variant="dark">
                    <a className="navbar-brand" href="/">MSAL React Tutorial</a>
                    {isAuthenticated ? <SignOutButton /> : <SignInButton />}
                </Navbar>
                <br />
                <br /> */}
                {props.children}
            </div>
            <footer></footer>
        </>

    );
};