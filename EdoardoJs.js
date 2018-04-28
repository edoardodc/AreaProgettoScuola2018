function myMove() {
  var elem = document.getElementById("myAnimation");
  var pos = 0;
  var id = setInterval(frame, 10);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.top = pos;
      elem.style.left = pos + 'px';
    }
  }
}


/*
var make_hexagon = function(el, size, idx) {
    var divs = 4*(size - 1) + 1;
    var style = {
        width: 400/divs + '%',
//         height: Math.sqrt(3)*400/divs/2 + '%',
//         marginTop: -Math.sqrt(3)*400/divs/2/2 + '%',
        marginBottom: '-5px',
        float: 'left',
        marginRight: -100/divs + '%'
    }
    if (idx%2 != 0) {

//         style.marginLeft = 300/divs + '%';
    }
//     style.marginRight = -100/divs/8 + '%'
//     style.marginTop = -Math.sqrt(3)*400/divs/2/2 + '%'
    if (idx%2 != 0) {
        style.marginTop = -Math.sqrt(3)*400/divs/2/2 + '%'
    }

//     style.marginBottom = -Math.sqrt(3)*400/divs/2/2 + '%'

    if (idx==0) {
//         style.marginTop = '0px'
    };

    var className = "hexagon type" + parseInt(Math.random()*4)%4;
    if (Math.random() < 0.25) {
        className += ' invert';
    }
    if (Math.random() > 0.25) {
        style.visibility = 'hidden';
    }

    return (
        <div className={className} style={style}>
          <svg style={{width: '100%', height: '100%'}}xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 726 628">
            <polygon points="723,314 543,625.769145 183,625.769145 3,314 183,2.230855 543,2.230855 723,314" fill="#1a2" stroke="green" stroke-width="4"/>
          </svg>
          <div className="hexagon-content">
            {el}
          </div>
        </div>
    )
}*/

var Navbar = React.createClass({displayName: "Navbar",

  getInitialState: function() {
    return {
      section: 0,
      fixed: false
    }
  },

  handleScroll: function(e) {
    var docHeight = document.documentElement.clientHeight;

    var i = 0;
    var found = false;
    for (i; i < this.sections.length; i++) {
      var rect = this.sections[i].getBoundingClientRect()
      var percentTop = rect.top / docHeight;
      if (percentTop >= 0.7) {
        i -= 1;
        found = true;
        break;
      }
    }
    var fixed = false;
    if (!found) i = this.sections.length - 1;
    if (i < 0) i = 0;

    if(this.node.getBoundingClientRect().top <= 0) {
      fixed = true;
    }

    this.setState({
      section: i,
      fixed: fixed
    });
  },

  componentDidMount: function() {
    this.node = ReactDOM.findDOMNode(this);
    this.sections = document.getElementsByClassName('section-title');

    document.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
    this.handleScroll();
  },

  componentWillUnmount: function() {
    document.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  },

  render: function() {
    var hexStyle = {
      transform: 'rotate(' + -60*this.state.section + 'deg' + ')',
      top: 8 + 53*this.state.section + 'px'
      // transform: 'rotate(' + -4*360*this.state.percent + 'deg)',
      // left: (0.5-sign*Math.sqrt(Math.abs(this.state.percent))*0.75)*100 + '%',
      // transition: 'linear left 0.1s'
    };

    var classnames = "";
    if (this.state.fixed) classnames += "fixed";

    var platyIdx = this.state.section % 4;

    return (
      React.createElement("div", null,
        React.createElement("nav", {className: "navbar " + classnames, id: "navbar"},
          React.createElement("h1", null, React.createElement("strong", null, "PennApps"), " XIV"),
          React.createElement("ul", null,
            this.props.children,

            React.createElement("div", {id: "hexagon", style: hexStyle},
              React.createElement("svg", {style: {width: '100%', height: '100%'}, xmlns: "http://www.w3.org/2000/svg", version: "1.1", height: "628", width: "726", viewBox: "0 0 726 628"},
                React.createElement("polygon", {points: "723,314 543,625.769145 183,625.769145 3,314 183,2.230855 543,2.230855 723,314", fill: "#1a2", stroke: "green", "stroke-width": "4"})
              )
            )
          ),

          React.createElement("img", {id: "nav-logo", src: "src/img/logo-outline-white.svg"}),
          React.createElement("img", {id: "nav-platypus", src: "src/img/platypus" + platyIdx + ".png"})
        ),
      React.createElement("div", {id: "nav-backdrop", className: classnames},
        React.createElement("div", {id: "nav-backdrop-color"})
      )
      )
    )
  }
})
