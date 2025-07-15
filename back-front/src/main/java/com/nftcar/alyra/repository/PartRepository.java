package com.nftcar.alyra.repository;

import com.nftcar.alyra.domain.Part;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Part entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PartRepository extends JpaRepository<Part, Long> {}
