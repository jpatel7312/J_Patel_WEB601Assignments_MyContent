import { Content } from "./content-interface";

let contentListArr:Content[] = [];

const generateContent = (id:number,contentArr:(string)[])=>{
    return {
      id,
      title:contentArr[0],
      description:contentArr[1],
      creator:contentArr[2]
    }
}
export const contentList = {
    generateContent: ():Content[]=>{
        contentListArr.push({
            ...generateContent(
              1,['Avatar','Most popular aminated movie of all time','James Cameron']
            ),
            ...{imgURL:'../assets/avatar.jpg'},
            ...{type:'Movie'},
            ...{tags:['Animated','Most Popular','Creative']}
        });
        contentListArr.push({
            ...generateContent(
              2,['Friends',`Friends is a 90's Comedy TV show`,'David Crane and Marta Kauffman']
            ),
            ...{type:'Sitcom'},
            ...{imgURL:'https://cdn.wallpapersafari.com/83/31/b59cLE.jpg'}
        });
        contentListArr.push({
            ...generateContent(
              3,['Squid Game','Players in deep financial hardship, risk their lives to play a series of deadly Game','Hwang Dong-hyuk']
            ),
            ...{type:'Web-Series'}
        });
          contentListArr.push({
            ...generateContent(
              4,['3 Idiots',' Indian Hindi-language coming-of-age comedy-drama film written, edited and directed by Rajkumar Hirani','Rajkumar Hirani']
            ),
            ...{type:'Movie'},
            ...{imgURL:'https://i.zoomtventertainment.com/story/Untitled_design_-_2020-05-01T135137.466.jpg'},
            ...{tags:['Bollywood','Most Popular Hindispeaking Movie','Comedy','Based on book']}
          });
          contentListArr.push({
            ...generateContent(
              5,['A Beautiful Mind','A Beautiful Mind is a 2001 American biographical drama film directed by Ron Howard','Akiva Goldsman']
            )
          });
          contentListArr.push({
            ...generateContent(
              6,['The Recruit','The Recruit is a 2003 American spy thriller film','Roger Donaldson']
            )
          });
          contentListArr.push({
            ...generateContent(
              7,['The Shawshank Redemption','It is a 1994 American drama film','Frank Darabont']
            )
          });
          contentListArr.push({
            ...generateContent(
              8,['The God Father','The Godfather is a 1972 American crime film','Francis Ford Coppola']
            )
          });
      return contentListArr;
    },
    contentListArr
}