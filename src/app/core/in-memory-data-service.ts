import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student, Sponsor, Parish, Agency, Project, Contribution } from '../feature/model/index';
import { SponsorshipInfo } from '../feature/model/sponsorship-info';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
   const agency = {
     id: 1,
     name: 'CARD',
   }
   const project = {
     id: 1,
     name: 'Life to Life',
     agency,
   }
    const parish = {
      id: 1,
      code: 'NE-ST1001',
      name: 'St. Stephen\'s',
      isActive: false
    }
    const contributions = [
      { id: 1, dateReceived: '09/09/2010', amount: '250.00', status: 'Completed' },
      { id: 2, dateReceived: '09/09/2011', amount: '350.00', status: 'Completed' },
      { id: 3, dateReceived: '09/09/2012', amount: '550.00', status: 'Completed' }
    ]
    const sponsors = [
      {
        id: 1, 
        firstName: 'John', 
        lastName: 'Mathai', 
        IsActive: true, 
        emailAddress: 'john.mathai@sms.com',
        street: '120 Winterfell',
        city: 'xxxx',
        state: 'xxxx',
        zip: 5,
        hasAnyCoSponser: false,
        parish
      },
      {
        id: 1,
        firstName: 'Kurian',
        lastName: 'Thamp',
        IsActive: true,
        emailAddress: 'kurain.thampi@sms.com',
        street: '120 Iron Island',
        city: 'xxxxx',
        state: 'xxxxx',
        zip: 7,
        hasAnyCoSponser: true,
        coSponserFirstName: 'Molly',
        coSponserLastName: 'Kurian',
        coSponserRelationShip: 'Wife',
        parish
      },
    ];
    const students = [
      {
        id: 11, 
        firstName: 'Jinu', 
        lastName: 'Varghese', 
        gender: 'Male', 
        dateOfBirth: '05/05/1981',
        address: 'Tiruvalla',
        isSponsored: true,
        project,
        contributions: [contributions[0]],
      },
      { 
        id: 12, 
        firstName: 'Kiran', 
        lastName: 'Lukose', 
        gender: 'Male', 
        dateOfBirth: '10/05/1984',
        address: 'Tiruvalla',
        isSponsored: true,
        project,
        contributions: [contributions[1]], 
      },
      { 
        id: 13, 
        firstName: 'Gracy', 
        lastName: 'Chacko', 
        gender: 'Female', 
        dateOfBirth: '06/10/1990',
        address: 'Tiruvalla',
        isSponsored: true,
        project,
        hobbies: 'drawing',
        talent: 'singing',
        recentAchivements: ['school festival top']
      },
      { 
        id: 14, 
        firstName: 'Gracy', 
        lastName: 'Chacko', 
        gender: 'Female', 
        dateOfBirth: '06/10/1990',
        address: 'Tiruvalla',
        isSponsored: true,
        project,
        hobbies: 'drawing',
        talent: 'singing',
        recentAchivements: ['school festival top']
      },
      { 
        id: 15, 
        firstName: 'Gracy', 
        lastName: 'Chacko', 
        gender: 'Female', 
        dateOfBirth: '06/10/1990',
        address: 'Tiruvalla',
        isSponsored: true,
        project,
        hobbies: 'drawing',
        talent: 'singing',
        recentAchivements: ['school festival top']
      },
      { 
        id: 16, 
        firstName: 'Gracy', 
        lastName: 'Chacko', 
        gender: 'Female', 
        dateOfBirth: '06/10/1990',
        address: 'Tiruvalla',
        isSponsored: true,
        project,
        hobbies: 'drawing',
        talent: 'singing',
        recentAchivements: ['school festival top']
      },
      { 
        id: 17, 
        firstName: 'Gracy', 
        lastName: 'Chacko', 
        gender: 'Female', 
        dateOfBirth: '06/10/1990',
        address: 'Tiruvalla',
        isSponsored: true,
        project,
        hobbies: 'drawing',
        talent: 'singing',
        recentAchivements: ['school festival top']
      },
      { 
        id: 18, 
        firstName: 'Gracy', 
        lastName: 'Chacko', 
        gender: 'Female', 
        dateOfBirth: '06/10/1990',
        address: 'Tiruvalla',
        isSponsored: true,
        project,
        hobbies: 'drawing',
        talent: 'singing',
        recentAchivements: ['school festival top']
      },
      { 
        id: 19, 
        firstName: 'Gracy', 
        lastName: 'Chacko', 
        gender: 'Female', 
        dateOfBirth: '06/10/1990',
        address: 'Tiruvalla',
        isSponsored: true,
        project,
        hobbies: 'drawing',
        talent: 'singing',
        recentAchivements: ['school festival top']
      },
      { 
        id: 20, 
        firstName: 'Gracy', 
        lastName: 'Chacko', 
        gender: 'Female', 
        dateOfBirth: '06/10/1990',
        address: 'Tiruvalla',
        isSponsored: true,
        project,
        hobbies: 'drawing',
        talent: 'singing',
        recentAchivements: ['school festival top']
      },
    ];
    
    const sponsorshipDetails =
      [
        {
          sponser: sponsors[0],
          students: [students[1], students[2]],
          isActive: true
        },
        {
          sponser: sponsors[1],
          students: [students[0]],
          isActive: true
        }
      ];
    return { students, sponsors, sponsorshipDetails };
  }
}
