package techninja.coding.Amigos.Mananager.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import techninja.coding.Amigos.Mananager.model.Employee;

public interface EmployeeRepo extends JpaRepository < Employee, Long>
{
    
    void deleteEmployeeById(Long Id);

    Optional<Employee> findEmployeeById(Long id);

}
