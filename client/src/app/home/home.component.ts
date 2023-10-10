import { Component, Input, OnInit } from '@angular/core';
import { User } from '../shared/interfaces/user.interface';
import { AuthService } from '../shared/services/auth.service';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import { ReservationService } from '../shared/services/reservation.service';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input() public user!: User | null;
  @Input() public idBlog!: string;
  public patient: string = '';
  public dateReserve?: string;
  public events: any[] = [];
  public form: FormGroup = this.fb.group({
    patient: ['', Validators.required],
    date: ['', Validators.required],
    motif: ['', Validators.required]
  });
  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin
    ],
        headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    weekends: true,
    events: [], // Initialisez le tableau d'événements vide
  };
  public rendezVousList: any[] = [];
  public error?: string;

  constructor(
    private authService: AuthService,
    private reservationService: ReservationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      // Traitez la valeur de l'utilisateur ici
      this.user = user;
      // Mettez à jour les événements lorsque l'utilisateur se connecte
      this.updateEvents();
    });
    this.reservationService.getRendezVous().subscribe((x) => {
      if (x && x.length > 0) {
        this.events = x.map((rendezVous: any) => ({
          title: rendezVous.patient,
          date: rendezVous.date_et_heure,
        }));
      }
    });

    // Initialisez les événements au chargement de la page
    this.updateEvents();
  }

  // Méthode pour mettre à jour les événements en fonction de l'état de l'utilisateur
  private updateEvents() {
    this.events = this.rendezVousList;
  
    // Mettez à jour la propriété calendarOptions
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.events,
    };
  }

  public submit() {
    if (this.form.valid) {
      console.log(this.form.getRawValue())
      this.reservationService.inscription(this.form.getRawValue()).subscribe({
        next: () => window.location.reload(),
        error: (err) =>
          (this.error = err?.error || 'Mauvais mot de passe / email'),
      });
    }
  }


}
