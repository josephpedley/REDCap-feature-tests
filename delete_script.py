import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)



csrf_token = "c861ea724f63db8562ea0801bad5cf7e33cab104" #These values will need changing every time the script is used
phpsessid = "fl7thqn5kfkfss1biu3415f4dn" 

session = requests.Session()

session.cookies.set("PHPSESSID", phpsessid)

headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://redcap-test.imperial.ac.uk",
    "Referer": "https://redcap-test.imperial.ac.uk/redcap_v15.4.2/ProjectSetup/other_functionality.php",
    "X-Requested-With": "XMLHttpRequest"
}
deletion_started = False

login_url = ""

for i in range(2130, 2200): #Also change these - it is the range of projects you need deleting
    url = f"https://redcap-test.imperial.ac.uk/redcap_v15.4.2/ProjectGeneral/delete_project.php?pid={i}"
    data = {
        "action": "delete",
        "delete_now": "0",
        "super_user_request": "0",
        "redcap_csrf_token": csrf_token
    }

    response = session.post(url, headers=headers, data=data, verify = False)
    if response.text == 'ERROR':
        print(f"Delete request for pid={i} → Status: {response.status_code}, Response: No project for pid {i}")
        if deletion_started:
            print('all projects have been deleted, Now stopping')
            break #Stops after all projects have been deleted

    elif response.text == '1':
        deletion_started = True
        print(f"Delete request for pid={i} → Status: {response.status_code}, Response: project {i} successfully deleted!")
    else:
        print('Not working - Ensure that csrf token and phpsessionid has been configured correctly and start again')
        break
    
    
