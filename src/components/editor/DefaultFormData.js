const DefaultFormData = [
    {
        id: 0,
        type: "header",
        image: "https://scontent-sea1-1.xx.fbcdn.net/v/t1.15752-9/274524207_464177512055429_6306242286224824430_n.png?_nc_cat=102&ccb=1-5&_nc_sid=ae9488&_nc_ohc=5OVlT-NLNN0AX_lvPLR&_nc_ht=scontent-sea1-1.xx&oh=03_AVIpPRSos-CncvdigKewmQdRzQsAHYgf3-_kiRzTN80GXQ&oe=624975E0",
        heading: "Midnight Crisis",
        subheading: "Directive Submission Form"
    },
    {
        id: 1,
        type: "shorttext",
        required: true,
        heading: "Directive Title",
        subheading: false
    },
    {
        id: 2,
        type: "radio",
        required: true,
        heading: "Directive Type",
        subheading: false,
        options: ["Public", "Private"]
    },
    {
        id: 3,
        type: "select-multiple",
        required: true,
        heading: "Sponsors",
        subheading: "Please enter all sponsor coutries.",
        max: 3,
        options: ["Afghanistan", "Belarus", "Canada", "Denmark"]
    },
    {
        id: 4,
        type: "select-multiple",
        required: false,
        heading: "Signatories",
        subheading: "Only applicable to public directives. Please enter all signatory coutries.",
        max: false,
        options: ["Afghanistan", "Belarus", "Canada", "Denmark", "AAA", "BBB", "CCC", "DDD", "Afghanistan", "Belarus", "Canada", "Denmark", "AAA", "BBB", "CCC", "DDD"]
    },
    {
        id: 5,
        type: "longtext",
        required: true,
        heading: "Operative Clause & Perceived Outcome",
        subheading: false
    },
    {
        id: 6,
        type: "longtext",
        required: false,
        heading: "Additional Notes",
        subheading: false
    },
    {
        id: 7,
        type: "multiplechoice",
        required: true,
        heading: "Test Multiple Choice",
        options: ["One", "Two", "Three"]
    },
    {
        id: 8,
        type: "content",
        heading: "Test Content",
        subheading: false,
        content: [{type: "text", heading:"History of the United Nations", value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
                {type: "image", heading: "The United Nations", value: "https://upload.wikimedia.org/wikipedia/commons/0/05/UN_General_Assembly_hall.jpg"}]
    },
    {
        id: 9,
        type: "dropdown",
        required: false,
        heading: "Test Dropdown",
        subheading: "Select your country",
        options: ["Afghanistan", "Belarus", "Canada", "Publius Licinius Crassus Dives", "Commander of the US Air Force Tactical Air Command - William W. Momyer"]
    },
    {
        id: 10,
        type: "select-multiple",
        required: false,
        heading: "Test Select Multiple",
        subheading: "Select all sponsor countries",
        max: 3,
        options: ["Afghanistan", "Belarus", "Canada", "Denmark"]
    }
]

export default DefaultFormData;