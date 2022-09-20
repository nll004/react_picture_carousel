import React from "react";

const NextArrow = (props) => {
    return (
        <i
            className={props.className}
            onClick={props.click}
            data-testid={props.testid}
        />
    )
};

export default NextArrow;
