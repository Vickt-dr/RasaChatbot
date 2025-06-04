import { db } from './database';

async function exampleUsage() {
  console.log('🔍 Database Usage Examples\n');

  try {
    // 1. Get all specialties
    console.log('1. All Specialties:');
    const specialties = await db.getAllSpecialties();
    specialties.forEach(specialty => {
      console.log(`   - ${specialty.name}: ${specialty.description}`);
      console.log(`     Doctors: ${specialty.doctors.length}`);
    });

    // 2. Get all doctors
    console.log('\n2. All Doctors:');
    const doctors = await db.getAllDoctors();
    doctors.forEach(doctor => {
      console.log(`   - ${doctor.name} (${doctor.specialty.name})`);
      console.log(`     Email: ${doctor.email}`);
      console.log(`     Phone: ${doctor.phone || 'N/A'}`);
    });

    // 3. Get patients and their appointments
    console.log('\n3. Patients and Appointments:');
    const patients = await db.getAllPatients();
    patients.forEach(patient => {
      console.log(`   - ${patient.name} (${patient.email})`);
      if (patient.appointments.length > 0) {
        patient.appointments.forEach(appointment => {
          console.log(`     📅 ${appointment.dateTime.toLocaleDateString()} ${appointment.dateTime.toLocaleTimeString()}`);
          console.log(`     👨‍⚕️ Dr. ${appointment.doctor.name} - ${appointment.doctor.specialty.name}`);
          console.log(`     📋 Status: ${appointment.status}`);
          if (appointment.notes) {
            console.log(`     📝 Notes: ${appointment.notes}`);
          }
        });
      } else {
        console.log(`     No appointments scheduled`);
      }
      console.log('');
    });

    // 4. Example: Search for a patient by email
    console.log('4. Search Patient by Email:');
    const patient = await db.getPatientByEmail('jose.silva@email.com');
    if (patient) {
      console.log(`   Found: ${patient.name}`);
      console.log(`   Appointments: ${patient.appointments.length}`);
    }

    // 5. Example: Get doctors by specialty
    console.log('\n5. Cardiologists:');
    const cardiologySpecialty = specialties.find(s => s.name === 'Cardiologia');
    if (cardiologySpecialty) {
      const cardiologists = await db.getDoctorsBySpecialty(cardiologySpecialty.id);
      cardiologists.forEach(doctor => {
        console.log(`   - ${doctor.name} (${doctor.email})`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await db.disconnect();
  }
}

// Run the example
exampleUsage(); 