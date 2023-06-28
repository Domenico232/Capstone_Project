package com.capstone.epicode.chess.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.capstone.epicode.chess.model.Cliente;
import com.capstone.epicode.chess.model.Fattura;
@Repository
public interface ClientiRepo  extends JpaRepository<Cliente, Long> {

	//Ordinamento
	public List<Cliente> OrderByNomeContattoAsc();
	public List<Cliente> OrderByFatturatoAnnualeAsc();
	public List<Cliente> OrderByDataInserimentoAsc();
	public List<Cliente> OrderByDataUltimoContattoAsc();
	@Query("SELECT c FROM Cliente c " +
            "JOIN c.indirizzoSedeLegale sl " +
            "JOIN sl.comune co " +
            "JOIN co.provincia p " +
            "ORDER BY p.nome ASC")
	public List<Cliente> orderBySedeLegaleProvincia();
	
	
	//Filter
	public List<Cliente> findByFatturatoAnnuale(long fatturato);
	public List<Cliente> findByDataInserimento(LocalDate data);
	public List<Cliente> findByDataUltimoContatto(LocalDate data);
	public List<Cliente> findByNomeContattoContainingIgnoreCase(String parteDelNome);
	
	
	//Exist
	public boolean existsByEmailContatto (String email);
	public boolean existsByEmail(String email);
	public boolean existsByPec(String pec);
	public boolean existsByTelefonoContatto(String telefono);
	public boolean existsByTelefono(String telefono);
	public boolean existsByPartitaIva(String partita_iva);
	
	
}
