    
    
    
    export const isDatePassed = (dateString) => {
        const appointmentDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        appointmentDate.setHours(0, 0, 0, 0);
        return appointmentDate < today;
    };