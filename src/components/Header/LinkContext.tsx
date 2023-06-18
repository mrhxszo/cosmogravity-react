//The purpose of this context is store the value of the link that the user
//have clicked and pass it other components so they can render the desired component accordingly
//think of this like a global variable that stores the information where you clicked and passes it to the desired components to be loaded

import React, { createContext} from "react";

export interface LinkContextProps {
    linkClicked: string;
    setLinkClicked: React.Dispatch<React.SetStateAction<string>>;
  }
  
  const LinkContext = createContext<LinkContextProps>({
    linkClicked: "",
    setLinkClicked: () => {},
  });

  export default LinkContext;