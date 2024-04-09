import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @PostMapping("/saveTicket")
    public void saveTicket(@RequestBody Ticket ticket) {
        ticketRepository.saveTicket(ticket);
    }

    @GetMapping("/getTickets")
    public List<Ticket> getTickets() {
        return ticketRepository.getTickets();
    }

    @DeleteMapping("/deleteAllTickets")
    public void deleteAllTickets() {
        ticketRepository.deleteAllTickets();
    }
}