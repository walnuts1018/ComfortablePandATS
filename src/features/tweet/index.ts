const addTweetButton = () => {
  var postedButton = document.querySelector("[name='eventSubmit_doConfirm_assignment_submission']");
  const postedButton2 = document.querySelector("[name='eventSubmit_doCancel_view_grade']");

  if (!postedButton) {
    if(!postedButton2){
      return;
    }
    postedButton = postedButton2;
  }

  const postedButtonParent = postedButton?.parentNode;

  if (!postedButtonParent){
    return;
  }



  var assignmentInfoTable = <HTMLTableElement>document.querySelector("[class='itemSummary']");
  var assignmentTitle="";
  var assignmentDate="";

  if (assignmentInfoTable){
    for (let row of Array.from(assignmentInfoTable.rows)) {
      if(!row.children[0].textContent){
        break;
      }
      if(row.children[0].textContent.trim()=="タイトル"){
        if(row.children[1].textContent){
        assignmentTitle = "課題名: "+row.children[1].textContent.trim()+'\n';
        }
      }
      if(row.children[0].textContent.trim()=="提出日時"){
        if(row.children[1].textContent){
        assignmentDate = "提出日: "+row.children[1].textContent.trim()+'\n';
        }
      }
    }
  }
  var tweetText = encodeURIComponent('課題を提出しました！\n'+assignmentTitle+assignmentDate);

  var tweetButton = document.createElement("a");
  var tweetButtonTextNode = document.createTextNode("Tweet");

  tweetButton.appendChild(tweetButtonTextNode);
  tweetButton.setAttribute("href","https://twitter.com/share?text="+tweetText+"&hashtags=PandA"+'\n');
  tweetButton.setAttribute("class","twitter-share-button");
  tweetButton.setAttribute("data-show-count","false");



  // css
  tweetButton.style.cssText = 'isplay: inline-block; margin: 0; padding: 7px 16px; border: 1px solid rgba(26, 140, 216, 1); -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px; background: #1a8cd8; font-family: "Open Sans",sans-serif; font-size: 1em; font-weight: 600; line-height: 18px; color: var(--button-primary-text-color); text-decoration: none; text-transform: none; cursor: pointer; -moz-appearance: none; -webkit-appearance: none; box-shadow: var(--button-primary-shadow);';

  postedButtonParent.insertBefore(tweetButton, postedButton.nextSibling);
};

export default addTweetButton;
