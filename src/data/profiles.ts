import type { Profile } from '../types'

export const seedProfiles: Profile[] = [
  // 100 unique corporate profiles
  ...[...Array(100)].map((_, i) => {
    const names = [
      'Aarav Sharma','Neha Verma','Karan Mehta','Priya Singh','Rohit Gupta','Simran Kaur','Vikram Joshi','Ananya Rao','Siddharth Jain','Meera Nair',
      'Aditya Kapoor','Isha Malhotra','Rahul Sinha','Tanvi Patel','Manish Agarwal','Sneha Reddy','Amit Chauhan','Pooja Bhatia','Saurabh Desai','Ritu Garg',
      'Deepak Mishra','Shweta Tripathi','Nitin Saxena','Divya Menon','Harsh Vardhan','Aishwarya Pillai','Rajesh Kumar','Kavita Sharma','Abhishek Yadav','Nandini Das',
      'Gaurav Bansal','Riya Choudhary','Vivek Anand','Sonal Joshi','Arjun Khanna','Mona Singh','Sandeep Rawat','Preeti Saini','Ashish Goel','Bhavna Kapoor',
      'Tarun Mathur','Payal Jain','Rakesh Singh','Ekta Sharma','Mohit Agarwal','Aparna Sen','Varun Saxena','Rashmi Desai','Yash Gupta','Neelam Sinha',
      'Amitabh Roy','Richa Sharma','Prateek Verma','Swati Agarwal','Kunal Mehta','Nisha Chauhan','Rajat Kapoor','Anjali Sharma','Vivek Singh','Shruti Nair',
      'Siddhi Joshi','Dhruv Malhotra','Roshni Patel','Ankit Sharma','Tanya Gupta','Ramesh Kumar','Megha Sinha','Vikas Jain','Shilpa Reddy','Ajay Chauhan',
      'Radhika Menon','Suresh Pillai','Aarti Agarwal','Naveen Saxena','Bhavya Kapoor','Rohini Desai','Saket Goel','Priyanka Saini','Kishore Mathur','Lavanya Jain',
      'Rajat Singh','Snehal Joshi','Aman Khanna','Nikita Singh','Ravindra Rawat','Kritika Saini','Siddharth Goel','Ayesha Kapoor','Manoj Mathur','Ritika Jain',
      'Rohit Saxena','Shreya Desai','Vivek Kapoor','Ankita Sinha','Saurabh Mehta','Neha Agarwal','Tarun Joshi','Pallavi Sharma','Amit Saini','Ruchi Kapoor'
    ]
    const roles = ['Product Manager','Data Scientist','Engineering Manager','UX Designer','HR Lead','Finance Analyst','DevOps Engineer','Backend Developer','Frontend Developer','QA Lead','Business Analyst','Marketing Manager','Sales Lead','Cloud Architect','Security Specialist','Support Lead','Mobile Developer','AI Researcher','Scrum Master','Operations Manager']
    const companies = ['TechNest','Nagarro','FinZest','Cloudify','BizWorks','InnoSoft','DataMinds','WebGen','SecureIT','Marketify','HRHub','SalesPro','Appify','BlueSky','GreenLeaf','NextGen','CodeCraft','Visionary','CoreLogic','BrightPath']
    const locations = ['Gurugram','Noida','Bengaluru','Hyderabad','Pune','Mumbai','Chennai','Jaipur','Kolkata','Ahmedabad']
    const interests = ['running','yoga','mentoring','cycling','cloud','ML fairness','UX','sustainability','travel','tech podcasts','music','reading','sports','cooking','photography','volunteering','gaming','blogging','public speaking','networking']
    const languages = [
      ['English','Hindi'],['English','Kannada'],['English','Tamil'],['English','Telugu'],['English','Marathi'],['English','Bengali'],['English','Punjabi'],['English','Gujarati'],['English','Malayalam'],['English','Odia']
    ]
    const photos = [
      'https://avatars.dicebear.com/api/avataaars/pm1.svg',
      'https://avatars.dicebear.com/api/avataaars/ds1.svg',
      'https://avatars.dicebear.com/api/avataaars/em1.svg',
      'https://avatars.dicebear.com/api/avataaars/ux1.svg',
      'https://avatars.dicebear.com/api/avataaars/hr1.svg',
      'https://avatars.dicebear.com/api/avataaars/fa1.svg',
      'https://avatars.dicebear.com/api/avataaars/de1.svg',
      'https://avatars.dicebear.com/api/avataaars/be1.svg',
      'https://avatars.dicebear.com/api/avataaars/fe1.svg',
      'https://avatars.dicebear.com/api/avataaars/qa1.svg'
    ]
    const name = names[i % names.length]
    const role = roles[i % roles.length]
    const company = companies[i % companies.length]
    const location = locations[i % locations.length]
    const interestArr = [interests[i % interests.length], interests[(i+3)%interests.length], interests[(i+7)%interests.length]]
    const langArr = languages[i % languages.length]
    const photo = [photos[i % photos.length]]
    const birthYear = 1985 + (i % 20)
    const birthMonth = 1 + (i % 12)
    const birthDay = 1 + (i % 28)
    return {
      id: `p${i+1}`,
      name,
      age: 2025 - birthYear,
      birthDate: `${birthYear}-${String(birthMonth).padStart(2,'0')}-${String(birthDay).padStart(2,'0')}`,
      role,
      company,
      location,
      interests: interestArr,
      languages: langArr,
      bio: `${role} at ${company} in ${location}. Loves ${interestArr.join(', ')}. Speaks ${langArr.join(', ')}.`,
      photos: photo,
      height: 150 + (i % 40) // height in cm, 150-189
    }
  })
]
