const DefaultFormData = [
    {
        id: 1,
        type: "header",
        required: true,
        image: "https://scontent-sea1-1.xx.fbcdn.net/v/t1.15752-9/274524207_464177512055429_6306242286224824430_n.png?_nc_cat=102&ccb=1-5&_nc_sid=ae9488&_nc_ohc=5OVlT-NLNN0AX_lvPLR&_nc_ht=scontent-sea1-1.xx&oh=03_AVIpPRSos-CncvdigKewmQdRzQsAHYgf3-_kiRzTN80GXQ&oe=624975E0",
        heading: "Midnight Crisis",
        subheading: "Directive Submission Form"
    },
    {
        id: 2,
        type: "shorttext",
        required: true,
        heading: "Directive Title",
        subheading: false
    },
    {
        id: 3,
        type: "radio",
        required: true,
        heading: "Directive Type",
        subheading: false,
        options: ["Public", "Private"]
    },
    {
        id: 4,
        type: "shorttext",
        required: true,
        heading: "Sponsor Signatures",
        subheading: "Please enter all sponsor names, separated by commas (Ex. France, Germany, US)."
    },
    {
        id: 5,
        type: "shorttext",
        required: false,
        heading: "Signatory Signatures",
        subheading: "Only applicable to public directives. Please enter all signatory names, separated by commas (Ex. France, Germany, US)."
    },
    {
        id: 6,
        type: "longtext",
        required: true,
        heading: "Operative Clause & Perceived Outcome",
        subheading: false
    },
    {
        id: 7,
        type: "longtext",
        required: false,
        heading: "Additional Notes",
        subheading: false
    },
    {
        id: 8,
        type: "multiplechoice",
        required: true,
        heading: "Test Multiple Choice",
        options: ["One", "Two", "Three"]
    },
    {
        id: 9,
        type: "content",
        required: false,
        heading: "Test Content",
        subheading: false,
        content: [{type: "text", heading:"History of the United Nations", value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
                {type: "image", heading: "The United Nations", value: "https://upload.wikimedia.org/wikipedia/commons/0/05/UN_General_Assembly_hall.jpg"}]
    },
    {
        id: 10,
        type: "dropdown",
        required: false,
        heading: "Test Dropdown",
        subheading: "Select your country",
        options: ["Afghanistan", "Belarus", "Canada", "Publius Licinius Crassus Dives", "Commander of the US Air Force Tactical Air Command - William W. Momyer"]
    },
    {
        id: 11,
        type: "dropdown-multiple",
        required: false,
        heading: "Test Dropdown Multiple",
        subheading: "Select all sponsor countries",
        options: ["Afghanistan", "Belarus", "Canada", "Denmark"]
    }
]

export default DefaultFormData;