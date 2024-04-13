package oslomet.data1700_oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TicketController2 {

    @Autowired
    TicketRepository rep;

    @PostMapping("/saveTicket")
    public void saveTicket(Ticket ticket) {
        rep.saveTicket(ticket);
    }

    @GetMapping("/getTickets")
    public List<Ticket> getTickets() {
        return rep.getTickets();
    }
    @GetMapping("/getHello")
    public String getHello() {
        return "Hello world!";
    }

    @DeleteMapping("/deleteAllTickets")
    public void deleteAllTickets() {
        rep.deleteAllTickets();
    }
}
