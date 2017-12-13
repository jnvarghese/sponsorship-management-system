import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student, Sponsor } from '../feature/model/index';
import { SponsorshipInfo } from '../feature/model/sponsorship-info';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const sponsors: Sponsor[] = [
      { id: 1, name: 'Windstorm', active: true },
      { id: 2, name: 'Windfall', active: true },
      { id: 3, name: 'Bombasto', active: true },
      { id: 4, name: 'Magneta', active: false },
      { id: 5, name: 'Tornado', active: true }
    ];
    const students: Student[] = [
      { id: 1, name: 'Jinu', gender: 'Male', isSponsored: true },
      { id: 2, name: 'Rajeev', gender: 'Male', isSponsored: true },
      { id: 3, name: 'Sriram', gender: 'Male', isSponsored: false },
      { id: 4, name: 'Ajni', gender: 'Female', isSponsored: true }
    ];
    const sponsorshipDetails: SponsorshipInfo[] =
      [
        {
          id: 1,
          name: 'Windstorm',
          isActive: true,
          students: [
            {
              id: 1,
              name: 'Jinu',
              gender: 'Male',
              isSponsored: true,
              contributions: [
                { id: 1, dateReceived: '09/09/2010', amount: '250.00', status: 'Completed' },
                { id: 2, dateReceived: '09/09/2011', amount: '350.00', status: 'Completed' },
                { id: 3, dateReceived: '09/09/2012', amount: '550.00', status: 'Completed' }
              ]
            },
            {
              id: 4,
              name: 'Ajni',
              gender: 'Female',
              isSponsored: true,
              contributions: [
                { id: 1, dateReceived: '09/09/2013', amount: '50.00', status: 'Completed' },
                { id: 2, dateReceived: '09/09/2014', amount: '60.00', status: 'Completed' }, ,
                { id: 3, dateReceived: '09/09/2015', amount: '70.00', status: 'Completed' },
              ]
            }
          ]
        },
        {
          id: 2,
          name: 'Windfall',
          isActive: true,
          students: [
            {
              id: 2,
              name: 'Rajeev',
              gender: 'Male',
              isSponsored: true,
              contributions: [
                { id: 1, dateReceived: '09/09/2010', amount: '50.00', status: 'Completed' },
                { id: 2, dateReceived: '09/09/2011', amount: '50.00', status: 'Completed' },
                { id: 3, dateReceived: '09/09/2012', amount: '50.00', status: 'Completed' }
              ]
            },
            {
              id: 3,
              name: 'Sriram',
              gender: 'Male',
              isSponsored: true,
              contributions: [
                { id: 1, dateReceived: '09/09/2013', amount: '50.00', status: 'Completed' },
                { id: 2, dateReceived: '09/09/2014', amount: '50.00', status: 'Completed' },
                { id: 3, dateReceived: '09/09/2015', amount: '50.00', status: 'Completed' }
              ]
            }
          ]
        }
      ];
    return { students, sponsors, sponsorshipDetails };
  }
}
