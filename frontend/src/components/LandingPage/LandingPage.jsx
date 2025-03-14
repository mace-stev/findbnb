

const LandingPage = () => {
    console.log("LandingPage component loaded");
    return (
        <div>
            <div className="navbar">
                <div className="logo">Logo</div>
                <div className="links">
                    <a href="/">Link1</a>
                    <a href="/">Link2</a>
                    <a href="/">Link3</a>
                    <a href="/">Link4</a>
                </div>
            </div>
            <div className="header">ELEVATED STAY TREETOP CABINS</div>
            <div className="image-container">
                <img src="path/to/image.jpg" alt="Description" />
            </div>
            <div className="textbox">
                <p>Our Selene Interiors stand as an unparalled emblem if our service to our clients.
                    It is our belief that your time away from home is met by our excellent service!</p>
            </div>
            <a className="call-to-action" href="/">View All Spots</a>
        </div>
    );
};
export default LandingPage;