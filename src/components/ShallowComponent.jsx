import React from "react";
import shallowCompare from "react-addons-shallow-compare";

/**
 *
 */
class ShallowComponent extends React.Component {
    /**
     * kamil
     * @returns {*}
     */
    render() : string {
        return this.props.children;
    }

    shouldComponentUpdate(nextProps : Object, nextState : Object) : boolean {
        return shallowCompare(this, nextProps, nextState);
    }
}

module.exports = ShallowComponent;
