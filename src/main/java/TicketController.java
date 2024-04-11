import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.*;
import java.util.List;




@RestController
public class TicketController {

    @Autowired
    TicketRepository rep;

    @GetMapping("/saveTicket")
    public void saveTicket(Ticket ticket) {
        rep.saveTicket(ticket);
    }

    @GetMapping("/getTickets")
    public List<Ticket> getTickets() {
        return rep.getTickets();
    }

    @GetMapping("/deleteAllTickets")
    public void deleteAllTickets() {
        rep.deleteAllTickets();
    }
}